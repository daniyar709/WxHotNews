/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import NetTool from "./net/NetTool";
import ArticleView from "./view/ArticleView";
import ArticleDetail from "./view/ArticleDetail";
import { Navigator } from "react-native-deprecated-custom-components";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.netTool = new NetTool();
    this.state = {
      data: new Array()
    };
    this.page = 1;
    this.getArticle();
  }
  render() {
    return (
      <Navigator
        initialRoute={{ title: "微信热门新闻", index: 0 }}
        renderScene={(route, navigator) => {
          if (route.index == 0) {
            return (
              <View style={styles.container}>
                <View style={styles.navigation}>
                  <Text style={styles.titleStyle}>{route.title}</Text>
                </View>
                <ArticleView
                  data={this.state.data}
                  goDetails={item => {
                    navigator.push({
                      title: item.description,
                      index: route.index + 1,
                      item: item
                    });
                  }}
                  refresh={callback => {
                    this.page = 1;
                    this.call = callback;
                    this.getArticle();
                  }}
                  loadMore={() => {
                    this.getArticle();
                  }}
                />
              </View>
            );
          } else {
            return (
              <View style={styles.container}>
                <View style={styles.navigation}>
                  <Text style={styles.detailTitle}>{route.title}</Text>
                  <View style={styles.button}>
                    <Button
                      title="Back"
                      onPress={() => {
                        navigator.pop();
                      }}
                    />
                  </View>
                </View>
                <ArticleDetail uri={route.item.url} />
              </View>
            );
          }
        }}
      />
    );
  }

  getArticle() {
    this.netTool.getArticle(this.page, data => {
      let oldData = new Array();
      if (this.page === 1) {
      } else {
        oldData = this.state.data;
      }
      this.setState({
        data: oldData.concat(data.newslist)
      });
      this.page++;
      if (this.call) {
        this.call();
      }
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  },
  navigation: {
    height: 64,
    backgroundColor: "white"
  },
  titleStyle: {
    color: "gray",
    fontWeight: ("bold", "900"),
    fontSize: 22,
    marginTop: 15,
    alignSelf: "center",
    lineHeight: 60
  },
  detailTitle: {
    position: "absolute",
    color: "white",
    fontSize: 16,
    alignSelf: "center",
    lineHeight: 60,
    textAlign: "center"
  },
  button: {
    position: "relative",
    width: 60,
    height: 30,
    marginTop: 25,
    marginLeft: 15
  }
});
