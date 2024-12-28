package com.example.Chaptr.data;

import com.example.Chaptr.models.Favorites;
import com.example.Chaptr.models.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FavoritesRepository extends CrudRepository<Favorites, Integer> {

    Optional<Favorites> findByUser(User user);
}
