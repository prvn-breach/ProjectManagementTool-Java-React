package io.agileintelligence.ppmtool.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import io.agileintelligence.ppmtool.domain.Project;
import io.agileintelligence.ppmtool.exceptions.ProjectIdException;
import io.agileintelligence.ppmtool.repositories.ProjectRepository;

@Service
public class ProjectService {
	
	@Autowired
	private ProjectRepository projectRepository;
	
	public Project saveOrUpdateProject(Project project) {
		try {
			project.setProjectIdentifier(project.getProjectIdentifier().toUpperCase());
			return projectRepository.save(project);
			
		} catch (Exception e) {
			throw new ProjectIdException("Project ID '"+project.getProjectIdentifier().toUpperCase()+"' already exists.");
		}
	}
	
	public Project findProjectByIdentifier(String projectId) {
		
		Project project = projectRepository.findByProjectIdentifier(projectId);
		if (project == null) {
			throw new ProjectIdException("Project ID '"+projectId+"' does not exists.");
		}
		
		return projectRepository.findByProjectIdentifier(projectId);
	}
	
	public Iterable<Project> findAllprojects() {
		return projectRepository.findAll();
	}
	
	public void deleteProjectByIdentifier(String projectId) {
		Project project = projectRepository.findByProjectIdentifier(projectId);
		if (project == null) {
			throw new ProjectIdException("Cannot Project with ID '"+projectId+"'.This project does not exists. ");
		}
		projectRepository.delete(project);
	}
}
