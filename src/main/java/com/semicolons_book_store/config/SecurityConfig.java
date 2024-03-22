package com.semicolons_book_store.config;

import com.semicolons_book_store.service.SecurityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    @Autowired
    private SecurityService securityService;

    @Bean
    public BCryptPasswordEncoder getPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(securityService).passwordEncoder(getPasswordEncoder());
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        //CSRF, CORS
        http.csrf().disable().cors().disable();

        //Phân quyền sử dụng
        http.authorizeRequests()
                .antMatchers("/home/admin").hasRole("director")//Phân quyền
//                .antMatchers("/").hasAnyRole("ADMIN", "USER")
                .antMatchers("/checkout","/profile").authenticated() //Yêu Cầu Phải Đăng Nhập
                .anyRequest().permitAll(); //truy cập từ mọi nơi

        //Điều khiển lỗi truy cập không đúng vai trò
        http.exceptionHandling()
                        .accessDeniedPage("/unauthoried");


        //Giao diện đăng nhập
        http.formLogin()
                .loginPage("/login/form")
                .loginProcessingUrl("/login")
                .defaultSuccessUrl("/")
                .failureUrl("/login/error")
                .usernameParameter("username")
                .passwordParameter("password");

        /*http.sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.ALWAYS);*/

        /*http.rememberMe()
                .tokenValiditySeconds(86400);*/

        http.logout()
                .logoutUrl("/logout")
                .logoutSuccessUrl("/logout/success");

        /*http.oauth2Login()
                .loginPage("/auth/login/form")
                .defaultSuccessUrl("/oauth2/login/success", true)
                .failureUrl("/auth/login/error")
                .authorizationEndpoint()
                    .baseUri("/oauth2/authorization");*/
    }
}

