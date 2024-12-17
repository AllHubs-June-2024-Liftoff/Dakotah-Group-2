package com.example.Chaptr;
/* converting to React from Thyme Leaf (loading... Please wait...)
import com.example.Chaptr.controllers.AuthenticationController;
import com.example.Chaptr.data.UserRepository;
import com.example.Chaptr.models.User;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.HandlerInterceptor;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

public class AuthenticationFilter implements HandlerInterceptor {

    @Autowired
    UserRepository userRepository;

    @Autowired
    AuthenticationController authenticationController;

    // Whitelist of paths that can be accessed without authentication
    private static final List<String> WHITELIST = Arrays.asList(
            "/login",
            "/register",
            "/public/**",
            "/css",
            "/logout"
    );

    // Helper method to check if the path is in the whitelist
    private boolean isWhitelisted(String path) {
        for (String whitelistPath : WHITELIST) {
            if (path.startsWith(whitelistPath)) {
                return true;  // Path matches one of the whitelist entries
            }
        }
        return false;  // Path is not in the whitelist
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws IOException {
        // Check if the current request URL is in the whitelist
        if (isWhitelisted(request.getRequestURI())) {
            return true;  // Allow access to whitelisted paths
        }

        // Grab session data
        //Object userSession = request.getSession().getAttribute("user");
        HttpSession session = request.getSession();
        User user = authenticationController.getUserFromSession(session);

        // Check if user is logged in
        if (user != null) {
            return true;  // User is logged in, continue with the request
        }

        // If no user session, redirect to login page
        response.sendRedirect("/login");
        return false;  // Don't proceed with the request
    }

}
*/