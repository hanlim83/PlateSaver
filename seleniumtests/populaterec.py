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
from selenium.webdriver.chrome.service import Service #

import list_of_validations
import singlerecipe

class TestCreaterecipe():
  def setup_method(self, method):
    service = Service("C:/Users/Jan Weng/Documents/WAD2/chromedriver-win64/chromedriver.exe") #change this to your chromedriver filepath
    
    self.driver = webdriver.Chrome(service=service)
    self.vars = {}
    
  #def teardown_method(self, method):
    #self.driver.quit()

  def scroll_down(self):
    #A method for scrolling the page.
    # Get scroll height.
    last_height = self.driver.execute_script("return document.body.scrollHeight")
    while True:
        # Scroll down to the bottom.
        self.driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        # Wait to load the page.
        time.sleep(1)
        # Calculate new scroll height and compare with last scroll height.
        new_height = self.driver.execute_script("return document.body.scrollHeight")

        if new_height == last_height:
            break

        last_height = new_height


  def test_createrecipe(self):
    #Recipedetails[ recipe1[recipename,preptime,cookingtime,description,servings,photo,ingredients[],directions[],calories,carbs,fat,protein,sodium,cholesterol] ,recipe2[],recipe3[] ]
    #Uncomment line 47 or 48, not both, to switch between creating multiple recipes or just one
    #recipeDetails= list_of_validations.recipeValidations
    recipeDetails=singlerecipe.recipeval
    self.driver.set_window_size(1512, 885)                                                                                                                                                    
      

    for aRecipe in recipeDetails:

        self.driver.implicitly_wait(3)

        self.driver.get("http://localhost:8080/auth/login") #browser opens this page
        #login
        self.driver.find_element(By.ID, "email").click()
        self.driver.find_element(By.ID, "email").send_keys("aujanweng@gmail.com") #use ur own credentials
        self.driver.find_element(By.ID, "password").click()
        self.driver.find_element(By.ID, "password").send_keys("platesavers") #use ur own credentials
        self.driver.find_element(By.ID, "signin").click()
        time.sleep(1)
        ####
        #navigate to create recipe page 
        navbarrecipes=self.driver.find_element(By.LINK_TEXT, "Recipes") #IMPORTANT! Don't move your mouse until it clicks the link else the dropdown will close
        ActionChains(self.driver)\
                .move_to_element(navbarrecipes)\
                .perform()
        time.sleep(1)
        
        self.driver.find_element(By.LINK_TEXT, "Create New Recipe").click()
        ####

        element = self.driver.find_element(By.ID, "servings")
        yscroll = 800
        ActionChains(self.driver)\
            .scroll_by_amount(0, yscroll)\
            .perform()
        self.driver.execute_script("window.scrollTo(0, 1080)")
        self.driver.find_element(By.ID, "recipename").click()
        self.driver.find_element(By.ID, "recipename").send_keys(aRecipe[0])
        self.driver.find_element(By.ID, "preptime").click()
        self.driver.find_element(By.ID, "preptime").send_keys(aRecipe[1])
        self.driver.find_element(By.ID, "cookingtime").click()
        self.driver.find_element(By.ID, "cookingtime").send_keys(aRecipe[2])
        self.driver.find_element(By.ID, "description").click()
        self.driver.find_element(By.ID, "description").send_keys(aRecipe[3])
        
        
        self.driver.find_element(By.ID, "servings").click()
        self.driver.find_element(By.ID, "servings").send_keys(aRecipe[4])
        #Upload image
        filePath= aRecipe[5]
        self.driver.find_element(By.ID, "photo").send_keys(filePath)
        time.sleep(1)
        ####
        
        self.driver.find_element(By.ID, "nextbutton").click()
        time.sleep(1)
        ingredients=aRecipe[6]
        for ingredientno in range(3):
            ingredientid="ingredient"+str(ingredientno)
            self.driver.find_element(By.ID, ingredientid).click()
            self.driver.find_element(By.ID, ingredientid).send_keys(ingredients[ingredientno])
        for ingredientno in range(3,len(ingredients)):
            ingredientid="ingredient"+str(ingredientno)
            self.driver.find_element(By.CSS_SELECTOR, ".show > .form-card .btn-content").click()    #add ingredient button
            self.scroll_down()
            self.driver.find_element(By.ID, ingredientid).click()
            self.driver.find_element(By.ID, ingredientid).send_keys(ingredients[ingredientno])
        
        self.driver.find_element(By.CSS_SELECTOR, ".show > .btn-primary > .btn-content").click()   #nextbutton
        directions=aRecipe[7]
        for directionno in range(3):
            directionid="direction"+str(directionno)
            self.driver.find_element(By.ID, directionid).click()
            self.driver.find_element(By.ID, directionid).send_keys(directions[directionno])

        for directionno in range(3,len(directions)):
            directionid="direction"+ str(directionno)
            self.driver.find_element(By.ID, "adddirection").click()   #add direction button
            self.scroll_down()
            self.driver.find_element(By.ID, directionid).click()
            self.driver.find_element(By.ID, directionid).send_keys(directions[directionno])
        
        self.driver.find_element(By.CSS_SELECTOR, "#payment > .btn-primary > .btn-content").click()  #next

        self.driver.find_element(By.ID, "calories").click()
        self.driver.find_element(By.ID, "calories").send_keys(aRecipe[8])
        self.driver.find_element(By.ID, "carbs").click()
        self.driver.find_element(By.ID, "carbs").send_keys(aRecipe[9])
        
        self.driver.find_element(By.ID, "fat").click()
        self.driver.find_element(By.ID, "fat").send_keys(aRecipe[10])
        self.driver.find_element(By.ID, "protein").click()
        self.driver.find_element(By.ID, "protein").send_keys(aRecipe[11])
        self.driver.find_element(By.ID, "sodium").click()
        self.driver.find_element(By.ID, "sodium").send_keys(aRecipe[12])
        self.driver.find_element(By.ID, "cholesterol").click()
        self.driver.find_element(By.ID, "cholesterol").send_keys(aRecipe[13])
        time.sleep(1)
        self.driver.find_element(By.CSS_SELECTOR, "#submitrecipe > .btn-content").click()
        element = self.driver.find_element(By.ID, "submitrecipe")
        actions = ActionChains(self.driver)
        actions.move_to_element(element).perform()
    #self.driver.close()
  
