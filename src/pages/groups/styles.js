import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDEDED',
    alignItems: 'center',
    justifyContent: 'center'
  },

  header: {
    backgroundColor: '#DD7730',
    height: 50,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    padding: 2
  },

  backText: {
    color: '#FFF',
    fontSize: 18,
    alignItems: "center",
    justifyContent: 'center'
  },
  menuBox: {
    width: 100,
    height: 80
  },
  backButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 5
  },

  titleBox: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },

  titleText: {
    fontSize: 20,
    color: '#FFF',
    fontWeight: 'bold'
  },

  menuButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    padding: 5
  },

  noResultView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  scrollListView: {
    flex: 1,
    width: '100%'
  },

  groupListItem: {
    height: 60,
    justifyContent: 'center',
    padding: 5,
    paddingLeft: 15,
    backgroundColor: '#BBB',
    borderBottomColor: '#888',
    borderBottomWidth: 1
  },

  groupItemText: {
    color: '#FFF',
    fontSize: 18
  }
});


