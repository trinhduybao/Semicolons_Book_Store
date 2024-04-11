package com.semicolons_book_store.controller;

import com.semicolons_book_store.service.AccountService;
import com.semicolons_book_store.service.SessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class SecurityController {
    @Autowired
    AccountService accountService;
    
    @Autowired
    SessionService sessionService;

    @RequestMapping("/security/login/form")
    public String loginForm(Model model){
    	model.addAttribute("message", "Vui lòng đăng nhập");
        return "customer/page/login2";
    }

    @RequestMapping("/security/login/success")
    public String loginSuccess(Model model){

    	model.addAttribute("message", "Đăng nhập thành công");
        return "redirect:/product/list";
    }

    @RequestMapping("/security/login/error")
    public String loginError(Model model){
        model.addAttribute("message", "Sai thông tin của Tài Khoản !");
        return "customer/page/login2";
    }


    @RequestMapping("/security/login/ban")
    public String loginBan(Model model){
        model.addAttribute("message", "Tài khoản của bạn đã bị khoá !");
        return "customer/page/login2";
    }


    @RequestMapping("/unauthoried")
    public String loginUnauthoried(Model model){
        model.addAttribute("message", "Bạn không có quyền truy cập !");
        return "customer/page/login2";
    }

    @RequestMapping("/logout/success")
    public String logout(Model model) {
        model.addAttribute("message", "Đăng Xuất Thành Công");
        return "customer/page/login2";
    }

    @RequestMapping("/logout")
    public String logout() {
        /*sessionService.remove("account");*/
        return "customer/page/login2";
    }
}
