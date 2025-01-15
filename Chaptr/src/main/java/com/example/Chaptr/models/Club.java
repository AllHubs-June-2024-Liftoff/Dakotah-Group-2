package com.example.Chaptr.models;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.Size;

import java.util.HashSet;
import java.util.Set;

@Entity
public class Club extends AbstractEntity{

    @OneToOne(cascade = CascadeType.ALL)
    private Book bookOfTheMonth;

    @Size(max =  500, message = "Must be less than 500 characters!")
    private String clubMessage;

    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinTable(
            name = "club_members",
            joinColumns = @JoinColumn(name = "club_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    @JsonManagedReference
    private Set<User> members = new HashSet<>();


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

    public Set<User> getMembers() {
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
