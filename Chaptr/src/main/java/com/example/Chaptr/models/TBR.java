package com.example.Chaptr.models;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
public class TBR extends AbstractEntity {

    @ManyToMany
    @JoinTable(
            name = "user_tbr_books", // name of the join table
            joinColumns = @JoinColumn(name = "tbr_id"), // column for TBR entity
            inverseJoinColumns = @JoinColumn(name = "book_id") // column for Book entity
    )
    private List<Book> tbr;

    @OneToOne(mappedBy = "tbr")
    private User user;

    public TBR(User user, List<Book> tbrBooks) {
        super();
        this.user = user;
        this.tbr = tbrBooks;
    }

    public TBR() {}

    public List<Book> getTbr() {
        return tbr;
    }

    public void setTbr(List<Book> tbr) {
        this.tbr = tbr;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void addToTBR(Book bookToAdd) {
        if (!tbr.contains(bookToAdd)) {
            tbr.add(bookToAdd);
        }
    }

    public List<Book> getTbrBooks() {
        return tbr.isEmpty() ? tbr : new ArrayList<>();
    }
}