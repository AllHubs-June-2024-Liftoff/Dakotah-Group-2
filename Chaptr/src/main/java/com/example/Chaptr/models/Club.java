package com.example.Chaptr.models;

import jakarta.persistence.*;
import org.hibernate.engine.internal.Cascade;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Club extends AbstractEntity{

    @OneToOne(cascade = CascadeType.ALL)
    private Book bookOfTheMonth;

    private String clubMessage;

    @ManyToMany
    private final List<User> members = new ArrayList<>();

    public Club(Book bookOfTheMonth, String clubMessage) {
        super();
        this.bookOfTheMonth = bookOfTheMonth;
        this.clubMessage = clubMessage;
    }


    public Club(String clubMessage) {
        this.clubMessage = clubMessage;
    }


    public Club() {
    }

    public void addMember(User newMember){
        members.add(newMember);
    }

    public List<User> getMembers() {
        return members;
    }

    public Book getBookOfTheMonth() {
        return bookOfTheMonth;
    }

    public void setBookOfTheMonth(Book bookOfTheMonth) {
        this.bookOfTheMonth = bookOfTheMonth;
    }

    public String getClubMessage() {
        return clubMessage;
    }

    public void setClubMessage(String clubMessage) {
        this.clubMessage = clubMessage;
    }
}
