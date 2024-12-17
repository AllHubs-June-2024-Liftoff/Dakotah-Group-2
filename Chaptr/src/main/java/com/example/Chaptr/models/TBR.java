package com.example.Chaptr.models;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToOne;

import java.util.List;

@Entity
public class TBR extends AbstractEntity{

    private List<Book> tbrBooks;

    @OneToOne //not including (cascade = cascadeType.ALL) because a CRUD action on TBR should not cascade to User
    private User user; //foreign key

    public TBR(User user, List<Book> tbrBooks){
        super();
        this.user = user;
        this.tbrBooks = tbrBooks;
    }

    public TBR(){}

    public void addToTBR(Book bookToAdd){
        if (!(tbrBooks.contains(bookToAdd))){
            tbrBooks.add(bookToAdd);
        } //else display book already in TBR
    }

    public List<Book> getTbrBooks(){
        if (!(tbrBooks.isEmpty())){
            return tbrBooks;
        } //else display a message that no books are in TBR
        return tbrBooks; //remove when else statement has a return
    }

}
