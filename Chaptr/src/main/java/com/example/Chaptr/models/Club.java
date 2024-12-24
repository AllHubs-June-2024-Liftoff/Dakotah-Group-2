package com.example.Chaptr.models;


import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToOne;
import org.hibernate.engine.internal.Cascade;

import java.util.ArrayList;

@Entity
public class Club extends AbstractEntity{

    @OneToOne(cascade = CascadeType.ALL)
    private Book bookOfTheMonth;

    private String clubMessage;

    private final ArrayList<User> members = new ArrayList<>();

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

    public ArrayList<User> getMembers() {
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
