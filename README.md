# feedback.dp29.spb.ru

#links:
###/

###/feedback
#####attr: 
######name=ИвановИИ(or any existing) 
######ankid=1(or any active)

###/statistic
#####attr: 
######log=(from pS[ ]) 
######pas=(from pS[ ]) 
######ankid=(`` for all, or any active) 
######name=all(all for common statistic, or any existing docHref(ИвановИИ))

###/generator
#####attr: 
######log=(from pS[ ]) 
######pas=(from pS[ ])

#main path
###https://feedback.pol29.shn-host.ru/

#proxy path
###https://feedback.dp29.spb.ru/

#Technologies:
#React
##react prop-types react-dom

#lint
##eslint eslint-config-htmlacademy eslint-plugin-react

#collector&server
##webpack webpack-cli webpack-dev-server

#jsx transpiling
##@babel/core @babel/preset-env @babel/preset-react babel-loader

#CSS transpiling:
##css-loader postcss postcss-loader style-loader sass sass-loader

#CSS render (webpack plugin) 
##mini-css-extract-plugin

#net requests
##axios

#simple page & flag userdataNeed=false
https://feedback.pol29.shn-host.ru/feedback?name=%D0%9E%D0%B1%D1%89%D0%B5%D0%B5&ankid=97
https://feedback.pol29.shn-host.ru/feedback?name=%D0%9E%D0%B1%D1%89%D0%B5%D0%B5&ankid=97&userdataNeed=false
