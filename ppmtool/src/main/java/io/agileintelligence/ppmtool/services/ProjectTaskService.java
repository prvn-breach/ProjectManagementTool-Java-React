package io.agileintelligence.ppmtool.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import io.agileintelligence.ppmtool.domain.Backlog;
import io.agileintelligence.ppmtool.domain.Project;
import io.agileintelligence.ppmtool.domain.ProjectTask;
import io.agileintelligence.ppmtool.exceptions.ProjectNotFoundException;
import io.agileintelligence.ppmtool.repositories.BacklogRepository;
import io.agileintelligence.ppmtool.repositories.ProjectRepository;
import io.agileintelligence.ppmtool.repositories.ProjectTaskRepository;

@Service
public class ProjectTaskService {

	@Autowired
	private BacklogRepository backlogRepository;
	
	@Autowired
	private ProjectTaskRepository projectTaskRepository;
	
	@Autowired
	private ProjectRepository projectRepository;
	
	public ProjectTask addProjectTask(String projectIdentifier, ProjectTask projectTask) {
		
		try {
			//project tasks to be add to specific project, project!=null, backlog exists
			Backlog backlog = backlogRepository.findByProjectIdentifier(projectIdentifier);
			//set backlog to project task
			projectTask.setBacklog(backlog);
			
			//we want our project sequence to be like this: IDPRO-1, IDPRO-2 ...100 101
			Integer BacklogSequence = backlog.getPTSequence();
			
			//update backlogSequence to backlog
			BacklogSequence++;
			
			//update PTSequence Backlog Repository
			backlog.setPTSequence(BacklogSequence);
			
			//Add Sequence to Project Task
			projectTask.setProjectSequence(projectIdentifier+"-"+BacklogSequence);
			projectTask.setProjectIdentifier(projectIdentifier);
			
			//Initial priority when priority is null
			if (projectTask.getPriority() == 0 || projectTask.getPriority() == null) { // In the future  we need projectTask.getPriority == 0 to handle the form
				projectTask.setPriority(3);
			}
			//Initial status when status is null
			if (projectTask.getStatus() == "" || projectTask.getStatus() == null) {
				projectTask.setStatus("TO_DO");
			}
			
			return projectTaskRepository.save(projectTask);
			
		} catch (Exception e) {
			throw new ProjectNotFoundException("project not found.");
		}
	}
	
	public Iterable<ProjectTask> findBacklogById(String id) {
		
		Project project = projectRepository.findByProjectIdentifier(id);
		if (project == null) {
			throw new ProjectNotFoundException("Project ID '"+id+"' does not exists.");
		}
		return projectTaskRepository.findByProjectIdentifierOrderByPriority(id);
	}
	
	public ProjectTask findProjectTaskByProjectSequence(String backlog_id, String pt_id) {
		
		Backlog backlog = backlogRepository.findByProjectIdentifier(backlog_id);
		if (backlog == null) {
			throw new ProjectNotFoundException("Project with ID: '"+backlog_id+"' does not exists");
		}
		
		ProjectTask projectTask = projectTaskRepository.findByProjectSequence(pt_id);
		if (projectTask == null ) {
			throw new ProjectNotFoundException("Project Task '"+pt_id+"' not found.");
		}
		
		if (!projectTask.getProjectIdentifier().equals(backlog_id)) {
			throw new ProjectNotFoundException("Project Task '"+pt_id+"' does not exist in project: '"+backlog_id);
		}
		
		return projectTaskRepository.findByProjectSequence(pt_id);
	}
	
	public ProjectTask updateByProjectSequence(ProjectTask updatedPT, String backlog_id, String pt_id) {
		ProjectTask projectTask = findProjectTaskByProjectSequence(backlog_id, pt_id);
		projectTask = updatedPT;
		
		return projectTaskRepository.save(projectTask);
	}
	
	public void deleteByProjectSequence(String backlog_id, String pt_id) {
		ProjectTask projectTask = findProjectTaskByProjectSequence(backlog_id, pt_id);
		
		projectTaskRepository.delete(projectTask);
	}
}
