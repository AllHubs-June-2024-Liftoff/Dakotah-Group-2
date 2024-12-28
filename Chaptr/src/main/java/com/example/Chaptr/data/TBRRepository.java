package com.example.Chaptr.data;

import com.example.Chaptr.models.TBR;
import com.example.Chaptr.models.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TBRRepository extends CrudRepository<TBR, Integer> {

     Optional<TBR> findByUser(User user);
}
