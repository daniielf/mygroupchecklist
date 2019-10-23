import { StyleSheet } from 'react-native';
export default Styles = StyleSheet.create({
  container: {
    width: '100%'
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

  taskItem: {
    height: 60,
    backgroundColor: '#F5F5F5',
    borderBottomWidth: 1,
    borderBottomColor: '#AAA',
    justifyContent: 'center',
    padding: 5,
    paddingLeft: 15,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  }, 

  taskItemText: {
    flex: 4,
    fontSize: 20,
    color: '#454545'
  },

  buttonText: {
    color: '#FFF',
    fontSize: 16
  },

  editButton: {
    flex: 1,
    height: 30,
    borderRadius: 3,
    backgroundColor: '#8AD',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 3
  },

  finishButton: {
    flex: 1,
    height: 30,
    borderRadius: 3,
    backgroundColor: '#3A5',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 3
  },

  blankBottomSpacing: {
    height: 50,
    width: '100%'
  },

  floatButtonArea: {
    position: 'absolute',
    alignContent: 'flex-end',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    width: '100%',
    bottom: 10,
    right: 10
  },

  addItemButton: {
    backgroundColor: '#0A0',
    height: 46,
    width: 46,
    borderRadius: 23,
    justifyContent: 'center',
    alignItems: 'center'
  }
});