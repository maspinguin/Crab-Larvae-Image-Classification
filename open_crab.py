import cv2
import numpy as np
image = cv2.imread("/Users/bangkit/Project/Larva/img_1.JPG")
gray = cv2.cvtColor(image,cv2.COLOR_BGR2GRAY) 
cv2.namedWindow('grayscale',cv2.WINDOW_NORMAL)
cv2.resizeWindow('grayscale', 600,600)
cv2.imshow('grayscale', gray) 
cv2.waitKey(0) 

#binary 
ret,thresh = cv2.threshold(gray,80,255,0) 
cv2.namedWindow('threshold',cv2.WINDOW_NORMAL)
cv2.resizeWindow('threshold', 600,600)
cv2.imshow('threshold', thresh) 
cv2.waitKey(0) 

#dilation 
kernel = np.ones([25,30], np.uint8) 
img_dilation = cv2.dilate(thresh, kernel, iterations=1) 
cv2.namedWindow('dilatation',cv2.WINDOW_NORMAL)
cv2.resizeWindow('dilatation', 600,600)
cv2.imshow('dilatation', img_dilation) 
cv2.waitKey(0)


ctrs, hier = cv2.findContours(img_dilation.copy(), cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE) 
#sort contours 
sorted_ctrs = sorted(ctrs, key=lambda ctr: cv2.boundingRect(ctr)[0])

for i, ctr in enumerate(sorted_ctrs): 
    # Get bounding box 
    x, y, w, h = cv2.boundingRect(ctr) 
    
    # Getting ROI 
    roi = image[y:y+h, x:x+w] 
    # show ROI 
    #cv2.imshow('segment no:'+str(i),roi) 
    if w > 15 and h > 15:
        cv2.rectangle(image,(x,y),( x + w, y + h ),(0,255,0),4) 
    #cv2.waitKey(0) 
    #if w > 15 and h > 15: 
        #cv2.imwrite('D:\\{}.png'.format(i), roi)

print("Jumlah Larva : "+str(i))
cv2.namedWindow('mark',cv2.WINDOW_NORMAL)
cv2.resizeWindow('mark', 600,600)
cv2.imshow('mark',image) 
cv2.waitKey(0)
