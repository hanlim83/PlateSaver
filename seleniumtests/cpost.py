# Generated by Selenium IDE
import pytest
import time
import json
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.support import expected_conditions
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
from selenium.webdriver.chrome.service import Service

class TestCreateRecipeTest():
  def setup_method(self, method):
    service = Service("C:/Users/Jan Weng/Documents/WAD2/chromedriver-win64/chromedriver.exe")
    self.driver = webdriver.Chrome(service=service)
    self.vars = {}
  
  def teardown_method(self, method):
    self.driver.quit()
  
  def test_createRecipeTest(self):
    self.driver.set_window_size(1512, 885)
    self.driver.implicitly_wait(2)
    
    test =["Nasi Lemak","1 x Fresh Nasi Lemak Ayam Cabe Ijo","Telegram @WoShiShen","C:/Users/Jan Weng/Documents/WAD2/WAD2recipeimages/burger.jpg","#nasilemak#coconut"]
    self.driver.get("http://localhost:8080/auth/login")
    self.driver.find_element(By.ID, "email").click()
    self.driver.find_element(By.ID, "email").send_keys("aujanweng@gmail.com") #use ur own credentials
    self.driver.find_element(By.ID, "password").click()
    self.driver.find_element(By.ID, "password").send_keys("platesavers") #use ur own credentials
    self.driver.find_element(By.ID, "signin").click()
    time.sleep(1)
    navbarposts=self.driver.find_element(By.LINK_TEXT, "Posts")
    ActionChains(self.driver)\
            .move_to_element(navbarposts)\
            .perform()
    time.sleep(1)
    
    self.driver.find_element(By.LINK_TEXT, "Create New Post").click()
    self.driver.find_element(By.ID, "title").click()
    self.driver.find_element(By.ID, "title").send_keys(test[0])
    self.driver.find_element(By.ID, "description").click()
    self.driver.find_element(By.ID, "description").send_keys(test[1])
    self.driver.execute_script("window.scrollTo(0, 1080)")
    time.sleep(2)
    self.driver.find_element(By.ID, "contact").click()
    self.driver.find_element(By.ID, "contact").send_keys(test[2])
    
    filePath= test[3]
    self.driver.find_element(By.ID, "photo").send_keys(filePath)
    time.sleep(1)
    self.driver.find_element(By.ID, "tags").click()
    self.driver.find_element(By.ID, "tags").send_keys(test[4])
    self.driver.find_element(By.CSS_SELECTOR, ".btn:nth-child(2)").click()
    self.driver.execute_script("window.scrollTo(0,308.75)")
    time.sleep(1) #This is important, browser closes too quickly and somehow doesnt upload image