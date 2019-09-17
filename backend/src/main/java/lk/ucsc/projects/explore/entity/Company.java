package src.main.java.lk.ucsc.projects.explore.entity;

import javax.persistence.Entity;
import javax.persistence.Table;
import java.util.List;

@Entity
@Table(name = "Company")
public class Company {
    private int id;
    private String name;
    private List<String> locationList;
    private Media mediaList;
    private Payment payment;
    private String email;
    private List<User> userList;

    public Company(int id, String name, List<String> locationList, Media mediaList, Payment payment, String email, List<User> userList) {
        this.id = id;
        this.name = name;
        this.locationList = locationList;
        this.mediaList = mediaList;
        this.payment = payment;
        this.email = email;
        this.userList = userList;
    }

    public Company() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<String> getLocationList() {
        return locationList;
    }

    public void setLocationList(List<String> locationList) {
        this.locationList = locationList;
    }

    public Media getMediaList() {
        return mediaList;
    }

    public void setMediaList(Media mediaList) {
        this.mediaList = mediaList;
    }

    public Payment getPayment() {
        return payment;
    }

    public void setPayment(Payment payment) {
        this.payment = payment;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public List<User> getUserList() {
        return userList;
    }

    public void setUserList(List<User> userList) {
        this.userList = userList;
    }
}
