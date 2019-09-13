package src.main.java.lk.ucsc.projects.explore.entity;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name= "User")
public class User {
    @Id
    @Column(name = "ID")
    private String id;
    @Column(name="NAME")
    private String name;
    @Column(name = "EMAIL")
    private String email;
    @Column(name="PASSWORD")
    private String password;
    @Column(name="ISBLOCKED")
    private boolean isBlocked;
    @Column(name="ISREPORTED")
    private boolean isReported;
    @JoinColumn(name = "USER_ID")
    private List<String> userList;
    @JoinColumn(name = "GROUP_ID")
    private List<String> groupList;
    @JoinColumn(name = "EVENT_ID")
    private List<String> eventList;
    @JoinColumn(name = "INVITATION_ID")
    private List<String> invitationList;
    @JoinColumn(name = "COMPANY_ID")
    private List<String> CompanyList;


    public User() {
    }

    public User(String id, String name, String email, String password, boolean isBlocked, boolean isReported, List<String> userList, List<String> groupList, List<String> eventList, List<String> invitationList, List<String> companyList) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.isBlocked = isBlocked;
        this.isReported = isReported;
        this.userList = userList;
        this.groupList = groupList;
        this.eventList = eventList;
        this.invitationList = invitationList;
        CompanyList = companyList;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public boolean isBlocked() {
        return isBlocked;
    }

    public void setBlocked(boolean blocked) {
        isBlocked = blocked;
    }

    public boolean isReported() {
        return isReported;
    }

    public void setReported(boolean reported) {
        isReported = reported;
    }

    public List<String> getUserList() {
        return userList;
    }

    public void setUserList(List<String> userList) {
        this.userList = userList;
    }

    public List<String> getGroupList() {
        return groupList;
    }

    public void setGroupList(List<String> groupList) {
        this.groupList = groupList;
    }

    public List<String> getEventList() {
        return eventList;
    }

    public void setEventList(List<String> eventList) {
        this.eventList = eventList;
    }

    public List<String> getInvitationList() {
        return invitationList;
    }

    public void setInvitationList(List<String> invitationList) {
        this.invitationList = invitationList;
    }

    public List<String> getCompanyList() {
        return CompanyList;
    }

    public void setCompanyList(List<String> companyList) {
        CompanyList = companyList;
    }
}
