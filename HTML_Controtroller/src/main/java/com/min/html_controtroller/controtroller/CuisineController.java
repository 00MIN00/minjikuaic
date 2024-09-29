package com.min.html_controtroller.controtroller;

import cn.hutool.json.JSONObject;
import com.alibaba.nacos.shaded.com.google.gson.JsonArray;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

/*
* 测试class 部署删除
* */
@RequestMapping("/Cuisine")
@RestController
class CuisineController {
    @RequestMapping(value = "/HTML", method = RequestMethod.GET)
    public String HTML() {
        final File file = new File(this.getClass().getResource("/").getPath()
                .replace("target/classes/","src/main/resources/templates/menus/cuisine.html"));
        StringBuffer stringBuffer = new StringBuffer();
        String str = "<div class=\"col\" id=\"details\" style=\"padding-left:2vw; margin-top: 3vw;\">";
        try {
            FileInputStream fileInputStream = new FileInputStream(file);
            BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(fileInputStream, "utf-8"));

            while (bufferedReader.ready()) {
                stringBuffer.append(bufferedReader.readLine());
            }
            int startIndex = stringBuffer.indexOf(str);
            int endIndex = stringBuffer.indexOf("</div></div></body>", startIndex);

            if (startIndex != -1 && endIndex != -1) {
                String divContent = stringBuffer.substring(startIndex + str.length(), endIndex);
                return divContent;// 输出: Hello, World!
            } else {
                System.out.println("Div not found");
            }
        }catch (FileNotFoundException e) {
            throw new RuntimeException(e);
        } catch (UnsupportedEncodingException e) {
            throw new RuntimeException(e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        return null;
    }
    @RequestMapping(value = "/UpImgDate", method = RequestMethod.POST)
    public int UpImgDate( @RequestParam("img") MultipartFile multipartFile,HttpServletRequest request) {
        try {
            String imageFilePath = this.getClass().getResource("/").getPath().replace("target/classes/","src/main/resources/static/img/CuisineImage");
            File file = new File(String.format(
                    imageFilePath+File.separator+"%s%s",
                    request.getParameter("Preview"),
                    multipartFile.getOriginalFilename().substring(multipartFile.getOriginalFilename().lastIndexOf("."))));
            if (!file.isFile()) {
                file.createNewFile();
            }
            FileOutputStream fileOutputStream = new FileOutputStream(file);
            fileOutputStream.write(multipartFile.getBytes());
            fileOutputStream.close();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return 200;
    }
    @RequestMapping(value = "/DeleteImgDate", method = RequestMethod.DELETE)
    public int Delete(@RequestBody String name) {
        try {
            String imageFilePath = this.getClass().getResource("/").getPath().replace("target/classes/","src/main/resources/static/img/CuisineImage");
            File file = new File(String.format(
                    imageFilePath+File.separator+"%s%s",
                    name,
                    ".jpg"));
            if (file.isFile()) {
                file.exists();
                file.delete();
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        return 200;
    }




}