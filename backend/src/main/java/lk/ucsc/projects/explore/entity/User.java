package src.main.java.lk.ucsc.projects.explore.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.List;

@Entity
@Table(name= "User")
public class User {
    @Id
    private String id;
    private String name;
    private String email;
    private String password;
    private boolean isBlocked;
    private boolean isReported;
    private List<String> userList;
    private List<String> groupList;
    private List<String> eventList;
    private List<String> invitationList;
    private List<String> CompanyList;



}
