package com.example.Chaptr.models;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Book extends AbstractEntity {

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String bookCover;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String author;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String publicationDate;


    @OneToMany(mappedBy = "bookOfTheMonth")
    private final List<Club> clubs = new ArrayList<>();

    @ManyToMany(mappedBy = "tbr")
    private final List<TBR> tbr = new ArrayList<>();

    @ManyToMany(mappedBy = "favoritesList")
    private final List<Favorites> favoritesList = new ArrayList<>();

    public Book() {
        super();
    }

    public Book(String bookCover, String author, String publicationDate) {
        super();
        this.bookCover = bookCover;
        this.author = author;
        this.publicationDate = publicationDate;
    }

    public String getBookCover() {
        return bookCover;
    }

    public void setBookCover(String bookCover) {
        this.bookCover = bookCover;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getPublicationDate() {
        return publicationDate;
    }

    public void setPublicationDate(String publicationDate) {
        this.publicationDate = publicationDate;
    }
}