package io.agileintelligence.ppmtool.testweb;

import static org.junit.jupiter.api.Assertions.*;

import org.aspectj.lang.annotation.Before;
import org.json.JSONObject;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import io.agileintelligence.ppmtool.domain.Project;
import io.agileintelligence.ppmtool.web.ProjectController;

@RunWith(MockitoJUnitRunner.class)
class ProjectControllerTest {
	
	@Autowired
	private MockMvc mockMvc;
	
	private ProjectController projectController;
	
    @BeforeEach
    public void setup() {
    	projectController = new ProjectController();
        mockMvc = MockMvcBuilders.standaloneSetup(projectController).build();
    }
    
	
	@Test
	public void testCreateProject() throws Exception {
		String uri = "/api/project";
		Project project = new Project();
		project.setProjectName("PPM TOOL");
		project.setProjectIdentifier("PPM IDENTIFIER");
		project.setDescription("HELLO WORLD");
		
		String inputJson = "{\"projectName\": \"PPM TOOL\", \"projectIdentifier\" : \"ID12\", \"description\":\"HELLO WORLD\"}";
		
		MvcResult result =  mockMvc.perform(MockMvcRequestBuilders.post(uri)
				.contentType(MediaType.APPLICATION_JSON_VALUE)
				.content(inputJson)).andReturn();
		
		String response = result.getResponse().getContentAsString();
		String expectedJson = "{\"id\": 1, \"projectName\": \"PPM TOOL\", \"projectIdentifier\": \"ID12\", \"description\": \"HELLO WORLD\", \"start_date\": null, \"end_date\": null, \"created_At\": \"2020-32-31\", \"updated_At\": null	}";
		assertEquals(expectedJson, response);
	}
}
