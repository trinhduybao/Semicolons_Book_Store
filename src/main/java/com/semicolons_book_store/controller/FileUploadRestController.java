package com.semicolons_book_store.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Map;

@RestController
@CrossOrigin("*")
public class FileUploadRestController {

    // Thư mục để lưu trữ ảnh
    private static String UPLOADED_FOLDER = "src/main/resources/static/customer/img/product/book";

    @RequestMapping("/api/upload")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("Vui lòng chọn một tệp để tải lên.");
        }

        try {
            // Lưu tệp vào thư mục trên máy chủ
            byte[] bytes = file.getBytes();
            Path path = Paths.get(UPLOADED_FOLDER + File.separator + file.getOriginalFilename());
            Files.write(path, bytes);

            // Trả về tên tệp đã lưu để lưu vào cơ sở dữ liệu
            return ResponseEntity.ok().body(Map.of("imageName", file.getOriginalFilename()).toString());
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Lỗi khi tải lên tệp: " + e.getMessage());
        }
    }
}
