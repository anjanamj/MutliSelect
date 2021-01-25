import React from 'react';
import { StyleSheet, Text, View, FlatList, ScrollView, TouchableHighlight, TouchableOpacity } from 'react-native';
import { SearchBar, Header } from 'react-native-elements';

import { BookSearch } from 'react-native-google-books';
import db from '../config'

import MultiSelect from 'react-native-multiple-select';
export default class ReadStoryScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      bookName: "",
      reasonToRequest: "",
      IsBookRequestActive: "",
      requestedBookName: "",
      bookStatus: "",
      requestId: "",
      userDocId: '',
      docId: '',
      Imagelink: '',
      dataSource: [],
      showFlatlist: false,
      selectedItems: [],
    }
  }
  async getBooksFromApi(bookName) {
    this.setState({ bookName: bookName })
    if (bookName.length > 2) {
      var books = await BookSearch.searchbook(bookName, 'AIzaSyCppcPwomtrAifvfRSnZA_FrnNOUgzyAMg')
      this.setState({
        dataSource: books.data,
        showFlatlist: true
      })
      console.log(typeOf(this.state.dataSource))
    }
  }

  componentDidMount(){
    this.getBooksFromApi('Harry')
  }
  onSelectedItemsChange = selectedItems => {
    this.setState({ selectedItems });
  };


  renderItem = ({
    item, i
  }) => {
    let object = {
      title: item.volumeInfo.title,
      selfLink: item.selfLink,
      buyLink: item.saleInfo.buyLink,
      imageLink: item.volumeInfo.imageLinks
    }


    return (
      <TouchableHighlight
        style={{
          alignItems: "center",
          backgroundColor: "#DDDDDD",
          padding: 10,
          width: '90%',
        }}
        activeOpacity={0.6}
        underlayColor="#DDDDDD"
        onPress={() => {
          this.setState({
            showFlatlist: false,
            bookName: item.volumeInfo.title,
          })
        }
        }
        bottomDivider>

        <Text>
          {item.volumeInfo.title}
        </Text>
      </TouchableHighlight>
    )
  }


  render() {
    const { selectedItems } = this.state.selectedItems;
    return (
      <View style={styles.container}>
        <Text style={{ alignSelf: 'center', marginTop: 100 }}>
          Compare
        </Text>

        <View style={{ flex: 1 }}>
        
          <MultiSelect
            hideTags
            items={this.state.dataSource}
            uniqueKey="id"
            ref={(component) => { this.multiSelect = component }}
            onSelectedItemsChange={text => this.getBooksFromApi(text)}
            onClear={text => this.getBooksFromApi('')}
            // selectedItems={selectedItems}
            //selectText="Pick Items"
            searchInputPlaceholderText="Search Items..."
            onChangeInput={(text) => console.log(text)}
            // altFontFamily="ProximaNova-Light"
            tagRemoveIconColor="#CCC"
            tagBorderColor="#CCC"
            tagTextColor="#CCC"
            selectedItemTextColor="#CCC"
            selectedItemIconColor="#CCC"
            itemTextColor="#000"
            displayKey="name"
            searchInputStyle={{ color: '#CCC' }}
            submitButtonColor="#CCC"
            submitButtonText="Submit"
          /> 
          <View>
            {this.multiSelect && this.multiSelect.getSelectedItemsExt(selectedItems)}
          </View>
        </View>



      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: "green",
  },
  item: {
    backgroundColor: 'green',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  itemContainer: {
    height: 80,
    width: '100%',
    borderWidth: 2,
    borderColor: 'green',
    justifyContent: 'center',
    alignSelf: 'center',
  }
});