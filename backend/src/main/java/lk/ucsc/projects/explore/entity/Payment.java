package src.main.java.lk.ucsc.projects.explore.entity;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.time.LocalDateTime;

@Entity
@Table(name = "Payment")
public class Payment {
    @Id
    @Column(name = "ID")
    private int id;
    @Column(name = "PAYPALID")
    private String paypalId;
    @Column(name = "USERID")
    private String userId;
    @Column(name = "LOCALTIME")
    private LocalDateTime time;
    @Column(name = "AMOUNT")
    private double amount;

    public Payment(int id, String paypalId, String userId, LocalDateTime time, double amount) {
        this.id = id;
        this.paypalId = paypalId;
        this.userId = userId;
        this.time = time;
        this.amount = amount;
    }

    public Payment() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getPaypalId() {
        return paypalId;
    }

    public void setPaypalId(String paypalId) {
        this.paypalId = paypalId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public LocalDateTime getTime() {
        return time;
    }

    public void setTime(LocalDateTime time) {
        this.time = time;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }
}
