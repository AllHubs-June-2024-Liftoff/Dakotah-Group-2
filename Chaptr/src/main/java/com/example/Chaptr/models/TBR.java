package com.example.Chaptr.models;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToOne;

import java.util.List;

@Entity
public class TBR extends AbstractEntity{

    @ManyToMany
    private List<Book> tbr;

    @OneToOne(mappedBy = "tbr")//not including (cascade = cascadeType.ALL) because a CRUD action on TBR should not cascade to User
    private User user; //foreign key

    public TBR(User user, List<Book> tbrBooks){
        super();
        this.user = user;
        this.tbr = tbrBooks;
    }

    public TBR(){}

    public void addToTBR(Book bookToAdd){
        if (!(tbr.contains(bookToAdd))){
            tbr.add(bookToAdd);
        } //else display book already in TBR
    }

    public List<Book> getTbrBooks(){
        if (!(tbr.isEmpty())){
            return tbr;
        } //else display a message that no books are in TBR
        return tbr; //remove when else statement has a return
    }

}
