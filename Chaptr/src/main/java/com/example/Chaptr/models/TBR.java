package com.example.Chaptr.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class TBR extends AbstractEntity {

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
            name = "user_tbr_books",
            joinColumns = @JoinColumn(name = "tbr_id"),
            inverseJoinColumns = @JoinColumn(name = "book_id")
    )
    private List<Book> tbr = new ArrayList<>();

    @OneToOne(mappedBy = "tbr")
    @JsonIgnore
    private User user;

    public TBR(User user, List<Book> tbrBooks) {
        super();
        this.user = user;
        this.tbr = tbrBooks != null ? tbrBooks : new ArrayList<>();
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
        return tbr;
    }

    public void removeFromTBR(Book bookToRemove) {
        tbr.remove(bookToRemove);
    }

    public void clearTBR() {
        tbr.clear();
    }
}