package com.example.Chaptr.data;

import com.example.Chaptr.models.Book;
import org.springframework.data.repository.CrudRepository;

public interface BookRepository extends CrudRepository<Book, Integer> {

}
