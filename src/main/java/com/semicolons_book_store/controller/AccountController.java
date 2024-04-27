package com.semicolons_book_store.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.semicolons_book_store.dto.ChangePasswordRequest;
import com.semicolons_book_store.model.Account;
import com.semicolons_book_store.service.AccountService;

@Controller
public class AccountController {
	@Autowired
	AccountService accountService;
	
	
	@RequestMapping("/register")
	public String registerForm(Model model) {
        model.addAttribute("account", new Account());
        return "customer/register";
    }
	
	
	@PostMapping("/register")
	public String registerAccount(Account account, Model model, @Param("confirmPassword") String confirmPassword) {
		if (confirmPassword.equals(account.getPassword())) {
			accountService.registerAccount(account.getUsername(), account.getPassword(), account.getFirstName(), account.getLastName(), account.getEmail(), account.getAddress());
		} else {
			model.addAttribute("message", "Mật khẩu nhập lại không đúng !");
		}
		return "redirect:/security/login/form";
	}
	
	
	@RequestMapping("/security/lolgin/error")
    public String registerError(Model model){
        model.addAttribute("message", "Chưa đầy đủ thông tin !");
        return "customer/register";
    }
	
	
	@PostMapping("/change-password")
    public String changePassword(String username, String oldPassword, String newPassword, String confirmPassword, Model model) {
		if (confirmPassword == null) {
            // Xử lý khi confirmPassword là null
            model.addAttribute("message2", "Xác nhận mật khẩu không được để trống");
            return "redirect:/security/login/error"; // Đây là tên view để hiển thị kết quả
        }
		if (!confirmPassword.equals(newPassword)) {
            // Xử lý khi newPassword và confirmPassword không trùng khớp
			model.addAttribute("message2", "Mật khẩu mới và xác nhận mật khẩu không khớp");
            return "redirect:/security/login/error"; // Đây là tên view để hiển thị kết quả
        } 
		String message = accountService.changePassword(username, oldPassword, newPassword, confirmPassword);
		model.addAttribute("message", message);
        return "redirect:/security/login/form";
		
    }
}
