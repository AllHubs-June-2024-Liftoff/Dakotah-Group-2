package com.example.Chaptr.models;

import jakarta.persistence.Entity;

import java.util.List;

@Entity
public class TBR extends AbstractEntity{

    private List<Book> tbrBooks;

    private User user; //foreign key

    public TBR(User user, List<Book> tbrBooks){
        super();
        this.user = user;
        this.tbrBooks = tbrBooks;
    }

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
