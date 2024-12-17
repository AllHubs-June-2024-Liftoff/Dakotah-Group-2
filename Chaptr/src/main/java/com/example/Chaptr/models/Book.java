package com.example.Chaptr.models;

import jakarta.persistence.Entity;

@Entity
public class Book extends AbstractEntity{

    private String bookCover;

    private String author;

    private String publicationDate;

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
