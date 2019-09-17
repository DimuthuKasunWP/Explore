package src.main.java.lk.ucsc.projects.explore.entity;

import javax.persistence.*;

@Entity
@Table(name = "Media")
public class Media {

    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private  int id;
    @Column(name = "PARENTID")
    private String parentId;
    @Column(name = "TYPE")
    private String type;
    @Column(name = "PATH")
    private String path;

    public Media(int id, String parentId, String type, String path) {
        this.id = id;
        this.parentId = parentId;
        this.type = type;
        this.path = path;
    }

    public Media() {
    }

    public int getId() {
        return id;
    }


    public void setId(int id) {
        this.id = id;
    }

    public String getParentId() {
        return parentId;
    }

    public void setParentId(String parentId) {
        this.parentId = parentId;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }
}
