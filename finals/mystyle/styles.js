import { StyleSheet, Text, View } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafaeb',
    alignItems: 'center',
    padding: 16,
    width:'100%',
    height:'100%'
    },
  containerdash:{
    flex: 1,
    padding: 16,
    backgroundColor: '#fafaeb',
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    },
  logo:{
    width:80,
    height:80,
    position:'relative',
    top:'%'
  },
  headerContainer: {
    marginBottom: 15,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  logoImage: {
    width: 30,
    height: 30,
    marginRight: 8,
  },
  logoText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4caf50',
  },
  input:{
    width: '80%',
    borderWidth: 1,
    backgroundColor:'#fafaeb',
    borderColor: '#23c1aa',
    borderRadius:20,
    marginBottom: 5,
    padding: 20,
  },
  inputDropdown:{
    width: '80%',
    borderBottomWidth: 1,
    borderColor: '#999',
    marginBottom: 5,
  },
  inputdsh:{
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 15,
    marginRight: 10,
    backgroundColor: '#fff',
  },
  loginbtn:{
    width:'100%',
    alignItems:'flex-end',
    position:'relative',
    top:20,
    right:10
  },
  signbtn:{
    width: '90%',
    height:'60',
    backgroundColor: '#23c1aa',
    padding: 5,
    alignItems: 'center',
    textAlignL: 'center',
    marginTop:30,
    borderRadius:30,
    borderWidth: 5,
    borderColor: '#27b2a0',
  },
  signbtn2:{
    width:'100%',
    alignItems:'center',
    flexDirection:'row',
    textAlign:'center',
    justifyContent:'center',
    padding:'10'
  },

  bac0kButton: { 
    position: 'absolute', 
    top: 40, 
    left: 20 
  },

  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 20 
  },

  profilePic: { 
    width: 100, 
    height: 100, 
    borderRadius: 50, 
    backgroundColor: '#6CE8B7', 
    marginBottom: 10 
  },

  name: { 
    fontSize: 18, 
    fontWeight: 'bold' 
  },

  profileText: { 
    color: 'gray', 
    marginBottom: 20 
  },

  buttonRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between',
    width: '80%', 
    height:'10%',
    marginBottom: 20, },

  buttonAcc: { 
    backgroundColor: '#6CE8B7', 
    padding: 15, 
    borderRadius: 10, 
    width: '30%', 
    alignItems: 'center' 
  },
  buttonTextAcc: { 
    color: '#fff', 
    fontWeight: 'bold' 
  },

  link: { 
    width: '80%', 
    padding: 10, 
    borderBottomWidth: 1, 
    borderBottomColor: '#ccc' 
  },

  logoutButton: { 
    backgroundColor: '#6CE8B7', 
    padding: 15, 
    borderRadius: 10, 
    marginTop: 20, 
    width: '60%', 
    alignItems: 'center',
  },

  logoutText: { 
    color: '#fff', 
    fontWeight: 'bold' 
  },

  btnCon:{
    flexDirection: 'row',
    marginTop: 10,
    width: '100%', 
    justifyContent: 'center',
    alignItems: 'center', 
    position: 'relative',
    top:30,
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },

  fbbtn:{
    width:'30%',
    height:'50',
    backgroundColor:'blue',
    borderRadius:30,
    marginRight: 10
  },
  gbtn:{
    width:'30%',
    height:'50',
    backgroundColor:'red',
    borderRadius:30,
    marginRight: 10
  },
  topbar:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  
  divider: {
    width: '100%',
    height:1,
    backgroundColor: '#000',
    margin:10,
  },
  tabs:{
    width:'20%',
    height:'30',
    backgroundColor:'#D9D9D9',
    flexDirection:'row',
    alignItems:'center',
    textAlign:'center',
    justifyContent:'center',
    borderRadius:30,
    margin:5
  },
  dropdownBtn: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  dropdownBtnText: {
    fontSize: 16,
    color: '#333',
  },
  dropdownOptions: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    zIndex: 10,
  },
  dropdownOption: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width:'100%',
    height:'8%',
    justifyContent:'center',
    marginTop:'10'
  },
  sgtdish:{
    width:'100%',
    height:'40',
    backgroundColor:'#FDFFF0',
    marginTop:10,
    padding:5
  },
  dishes:{
    backgroundColor:'#FDFFF0',
    width:'100%',
    alignItems:'center',
    justifyContent:'center',
    flexDirection:'row',
    flexWrap:'wrap'
  },
  categoryTabs: {
    marginBottom: 15,
  },
  categoryTab: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: '#e0e0e0',
    borderRadius: 20,
    marginRight: 10,
  },
  activeTab: {
    backgroundColor: '#4caf50',
  },
  categoryTabText: {
    color: '#333',
    fontSize: 14,
  },
  activeTabText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  seeAllText: {
    color: '#4caf50',
    fontSize: 14,
  },
  dishesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  dishCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    width: '48%',
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  
  dish:{
    width:'30%',
    height:'45%',
    minHeight: 200,
    backgroundColor:'#6CE8B7',
    alignItems:'center',
    textAlign:'center',
    justifyContent:'center',
    borderRadius:20,
    margin:5
  },
  recommendationsContainer: {
    marginBottom: 20,
  },
  recommendationCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 12,
    flexDirection: 'row',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  recommendationImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
  recommendationInfo: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },
  recommendationName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  recommendationDesc: {
    fontSize: 14,
    color: '#666',
  },
  contectxt:{
    width:'100%',
    textAlign:'center',
    justifyContent:'center',
    alignItems:'center',
    margin:20
  },
  //
  codeContainer: {
    padding: 20,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 50,
    marginTop: 20,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    width: '80%', 
    alignSelf: 'center',
  },
  codeText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  button: {
    width: '60%',
    height:'60',
    backgroundColor: '#6CE8B7',
    padding: 17,
    alignItems: 'center',
    textAlignL: 'center',
    marginTop:10,
    borderRadius:30,
    borderWidth: 5,
    borderColor: '#5CC199',
  },
  button2: {
    width: '20%',
    height:'60',
    backgroundColor: '#6CE8B7',
    padding: 17,
    alignItems: 'center',
    textAlignL: 'center',
    marginTop:10,
    borderRadius:30,
    borderWidth: 5,
    borderColor: '#5CC199',
  },
  buttonText: {
    fontSize: 13,
    fontWeight: 'thin',
    color: '#000',
  },
  //
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#6CE8B7',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    width:'100%',
    height:'10%',
  },
  
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  avatarsContainer: {
    flexDirection: "row",
  },
  chatcon: {
    flex: 1,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 16,
  },
  messageBubble: {
    flexDirection: 'row', // Align items in a row
    alignItems: 'center', // Center items vertically
    marginVertical: 5,
    paddingHorizontal: 10,
  },
  avatarIcon: {
    width: 60, // Adjust size if necessary
    height: 60,
    borderRadius: 20,
    marginHorizontal: 5,
    justifyContent: 'flex-end', // Aligns to the right
    flexDirection: 'row-reverse', // Ensures avatar is at the right
  },
  messageTextContainer: {
    backgroundColor: '#6CE8B7',
    borderRadius: 10,
    padding: 10,
    maxWidth: '75%',
  },
  
  sentMessage: {
    alignSelf: 'flex-end', // Pushes it to the right
  },
  receivedMessage: {
    alignSelf: 'flex-start', // Pushes it to the left
  },
  messageText: {
    fontSize: 16,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    borderRadius:20,
    width:'95%',
    height:'90',
    position:'relative',
    bottom:'10'
  },
  icon: {
    paddingHorizontal: 5,
  },
  chatcon:{
    width:'90%',
    backgroundColor:'#FDFFF0'
  },
  foodDetail:{
    margin:20,
    alignItems:'center',
  },
  dividerFood:{
    width: '80%',
    height:2,
    borderRadius:30,
    backgroundColor: '#5CC199',
    margin:20,
  },
  scrollView: {
    marginBottom: 60, // Prevents overlap with bottom navigation
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 10,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  heartButtonCard: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 15,
    padding: 6,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 40,
    marginTop: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight:'45%',
    marginTop:'5'
  },
  ratingText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    paddingHorizontal: 40,
    marginTop: 10,
    fontSize: 14,
    color: '#666',
  },
  divider: {
    height: 1,
    backgroundColor: '#6CE8B7',
    marginVertical: 15,
    marginHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 40,
  },
  ingredientsList: {
    paddingHorizontal: 40,
    marginTop: 10,
  },
  ingredient: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  historyheader:{
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  historyActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
},
  actionButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: '#007AFF',
    borderRadius: 5,
    marginHorizontal: 5,
},
  deleteButton: {
    backgroundColor: '#FF3B30',
},
  clearButton: {
    backgroundColor: '#FF9500',
},
actionButtonText: {
    color: 'white',
    fontWeight: 'bold',
},
selectedHistoryItem: {
  backgroundColor: '#e6f7ff',
  borderColor: '#007AFF',
  borderWidth: 1,
},
checkbox: {
  marginRight: 10,
},
historyContent: {
  flex: 1,
},
historyContentWithCheckbox: {
  flex: 1,
  marginLeft: 5,
},
deleteIcon: {
  padding: 5,
},
scrollView: {
    flex: 1,
    width:'90%',
    height:'100%'
},
  historyList: {
    marginTop: 20,
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },
  favButton: {
    padding: 5,
  },
  favTopbar:{
    width:'100%',
    height:'13%',
    borderBottomWidth:1
  },
  favbackButton:{
    position: 'absolute',
    top: 60,
    left: 20,
    zIndex: 10,
  },
  
  favItem: {
    width:'30%',
    height:'45%',
    minHeight: 200,
    backgroundColor:'#6CE8B7',
    alignItems:'center',
    textAlign:'center',
    justifyContent:'center',
    borderRadius:20,
    margin:5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  dishInfo: {
    padding: 10,
  },
  dishImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  dishName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  detailsButton: {
    marginBottom: 10,
  },
  dishMeta: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  dishPrice: {
    fontSize: 14,
    color: '#4caf50',
  },
  
  flatFav:{
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between', // Evenly space items
    alignItems: 'center',
    paddingHorizontal: 10, // Add some space on the sides
  },
  infoContainer:{
    width:'100%',
    height:'100%',
    alignItems:'center',
  },
  info:{
    width:'90%',
    height:'10%',
    backgroundColor:'#6CE8B7',
    marginTop:'20',
    borderRadius:30
  },
  connectProfile:{
    width:'100%',
    height:'100%',
    alignItems:'center',
    marginTop:20
  },
  typeProfile:{
    width:'85%',
    height:'6%',
    backgroundColor:'blue',
    marginTop:'10',
    borderRadius:50
  },
  typeProfile2:{
    width:'85%',
    height:'6%',
    backgroundColor:'red',
    marginTop:'10',
    borderRadius:50
  },
  HelpContainer: {
    flex: 1,
    marginTop: 10,
    alignItems:'center',
    justifyContent:'center'
},
HelpSearch: {
    alignItems: 'center',
    marginBottom: 20,
},
helpBox: {
    backgroundColor: '#73E6BE',
    borderRadius: 10,
    padding: 15,
    marginVertical: 5,
    width: '90%',  // Make the width full
},
helpBoxTouchable: {
    flexDirection: 'row',
    justifyContent: 'space-between',  // Ensures text is left, icon is right
    alignItems: 'center',
    width: '100%',
},
helpBoxText: {
    fontSize: 16,
    color: '#000',
},
helpIcon: {
    fontSize: 22,
    color: '#000',
},
answerBox: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginTop: 5,
},
answerText: {
  fontSize: 12, // Adjust size as needed
  fontFamily: 'monospace', // Ensures equal spacing for characters
  color: '#000',
  textAlign: 'left', // Keeps ASCII formatting intact
  lineHeight: 14, // Helps with spacing issues
  padding: 5, // Adds some spacing inside the box
},
helpList: {
  alignItems: 'center', // Centers FAQ items inside
  paddingBottom: 20, // Extra padding at bottom
},
TermContainer:{
  width:'80%',
  height:'100%',
  textAlign:'center',
  alignItems:'center'
},
ingredientRow: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: 10,
},

ingredient: {
  fontSize: 16,
  color: '#333',
},

ingredientInput: {
  borderBottomWidth: 1,
  borderColor: '#aaa',
  fontSize: 16,
  flex: 1,
  marginRight: 10,
},

editButton: {
  marginRight: 190,
},

saveButton: {
  backgroundColor: '#6CE8B7',
  padding: 5,
  borderRadius: 5,
},

saveText: {
  color: 'white',
  fontWeight: 'bold',
},
familyContainer: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'center',
  padding: 20,
},
familyCard: {
  backgroundColor: '#6CE8B7',
  padding: 15,
  borderRadius: 15,
  margin: 10,
  width: 100,
  alignItems: 'center',
},
familyRole: {
  fontSize: 12,
  color: 'black',
},
familyName: {
  fontSize: 14,
  fontWeight: 'bold',
},
addFamilyBtn: {
  backgroundColor: '#6CE8B7',
  padding: 15,
  borderRadius: 100,
  alignItems: 'center',
  justifyContent: 'center',
  margin: 20,
  width: 50,
  height:50
},
modalContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',

},
modalContent: {
  backgroundColor: '#fff',
  padding: 20,
  borderRadius: 10,
  width: '80%',
  borderWidth:1
},
modalTitle: {
  fontSize: 20,
  fontWeight: 'bold',
  marginBottom: 10,
},
inputFam: {
  borderBottomWidth: 1,
  width: '100%',
  marginBottom: 10,
  padding: 5,
},
saveButton: {
  marginTop: 10,
  backgroundColor: '#6CE8B7',
  padding: 10,
  borderRadius: 20,
},
saveText: {
  color: 'white',
  textAlign: 'center',
  fontWeight: 'bold',
},
closeButton: {
  marginTop: 10,
  padding: 10,
},
closeText: {
  color: 'red',
  textAlign: 'center',
  fontWeight: 'bold',
},
deleteButton: {
  padding: 12,
  borderRadius: 5,
  marginTop: 10,
  alignItems: 'center',
},
deleteText: {
  color: '#fff',
  fontSize: 16,
  fontWeight: 'bold',
},
portionContainer: {
  padding: 20,
  backgroundColor: '#f5f5f5',
  borderRadius: 10,
  margin: 15,
  alignItems: 'center',
},
portionText: {
  fontSize: 18,
  fontWeight: 'bold',
  marginBottom: 10,
},
portionControls: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: 10,
},
portionButton: {
  width: 40,
  height: 40,
  borderRadius: 20,
  backgroundColor: '#5CC199',
  justifyContent: 'center',
  alignItems: 'center',
},
portionButtonText: {
  fontSize: 20,
  color: 'white',
  fontWeight: 'bold',
},
portionCount: {
  fontSize: 24,
  marginHorizontal: 20,
  minWidth: 30,
  textAlign: 'center',
},
portionInfo: {
  fontSize: 16,
  color: '#666',
  marginBottom: 15,
},
calendarButton: {
  flexDirection: 'row',
  alignItems: 'center',
  padding: 10,
  backgroundColor: 'white',
  borderRadius: 8,
  marginBottom: 15,
},
calendarButtonText: {
  marginRight: 10,
  color: '#333',
},
calendar: {
  width: '100%',
  borderRadius: 10,
  marginBottom: 15,
},
createPlanButton: {
  backgroundColor: '#5CC199',
  padding: 15,
  borderRadius: 8,
  width: '100%',
  alignItems: 'center',
},
createPlanButtonText: {
  color: 'white',
  fontWeight: 'bold',
  fontSize: 16,
},
scrollContent: {
  paddingBottom: 20,
  paddingHorizontal: 15,
},
header: {
  padding: 15,
},
recipeTitle: {
  fontSize: 24,
  fontWeight: 'bold',
  marginBottom: 10,
  textAlign: 'center',
},
description: {
  fontSize: 14,
  color: '#555',
  lineHeight: 20,
  marginBottom: 15,
  textAlign: 'center',
},
divider: {
  height: 1,
  backgroundColor: '#e0e0e0',
  marginVertical: 15,
},
sectionTitle: {
  fontSize: 18,
  fontWeight: 'bold',
  marginBottom: 10,
},
ingredientsList: {
  marginBottom: 10,
},
ingredient: {
  fontSize: 14,
  fontWeight: 'bold',
  marginBottom: 5,
},
subIngredient: {
  fontSize: 14,
  marginLeft: 15,
  marginBottom: 5,
},
stepsList: {
  marginBottom: 10,
},
stepText: {
  fontSize: 14,
  marginBottom: 5,
},
nutritionContainer: {
  backgroundColor: '#f5f5f5',
  borderRadius: 8,
  padding: 15,
  marginBottom: 10,
},
nutritionRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginBottom: 8,
},
nutritionLabel: {
  fontWeight: 'bold',
},
nutritionValue: {
  color: '#555',
},
portionContainer: {
  marginTop: 10,
},
portionTitle: {
  fontSize: 18,
  fontWeight: 'bold',
  marginBottom: 10,
  textAlign: 'center',
},
portionControls: {
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: 10,
},
portionButton: {
  width: 40,
  height: 40,
  borderRadius: 20,
  backgroundColor: '#5CC199',
  justifyContent: 'center',
  alignItems: 'center',
},
portionButtonText: {
  color: 'white',
  fontSize: 20,
  fontWeight: 'bold',
},
portionCount: {
  fontSize: 24,
  marginHorizontal: 20,
  minWidth: 30,
  textAlign: 'center',
},
portionInfo: {
  fontSize: 16,
  color: '#666',
  textAlign: 'center',
  marginBottom: 15,
},
dateButton: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: 'white',
  padding: 12,
  borderRadius: 8,
  marginBottom: 15,
  borderWidth: 1,
  borderColor: '#ddd',
},
dateButtonText: {
  color: '#333',
},
createPlanButton: {
  backgroundColor: '#5CC199',
  padding: 15,
  borderRadius: 8,
  alignItems: 'center',
},
disabledButton: {
  backgroundColor: '#cccccc',
},
createPlanButtonText: {
  color: 'white',
  fontWeight: 'bold',
  fontSize: 16,
},
modalOverlay: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0,0,0,0.5)',
},
modalContent: {
  backgroundColor: 'white',
  borderRadius: 10,
  padding: 10,
  width: '90%',
},
closeButton: {
  backgroundColor: '#5CC199',
  padding: 10,
  borderRadius: 5,
  marginTop: 10,
  alignItems: 'center',
},
closeButtonText: {
  color: 'white',
  fontWeight: 'bold',
},
});
