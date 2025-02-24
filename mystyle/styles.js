import { StyleSheet, Text, View } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFFF0', 
    alignItems: 'center',
    width:'100%',
  },
  logo:{
    width:80,
    height:80,
    position:'relative',
    bottom:'10%'
  },
  input:{
    width: '80%',
    borderBottomWidth: 1,
    borderColor: '#999',
    marginBottom: 5,
    padding: 20,
  },
  inputdsh:{
    width: '80%',
    marginTop:20,
    borderWidth: 3,
    borderRadius:30,
    borderColor: '#999',
    marginBottom: 4,
    padding: 20,

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
    backgroundColor: '#6CE8B7',
    padding: 5,
    alignItems: 'center',
    textAlignL: 'center',
    marginTop:30,
    borderRadius:30,
    borderWidth: 5,
    borderColor: '#5CC199',
  },
  signbtn2:{
    width:'100%',
    alignItems:'center',
    flexDirection:'row',
    textAlign:'center',
    justifyContent:'center',
    padding:'10'
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
    width:'100%',
    color:'black',
    alignItems:'center',
    margin:'40',
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
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom:10,
    width:'100%',
    height:'8%',
    justifyContent:'center',
    borderWidth:1
  },
  sgtdish:{
    width:'100%',
    height:'40',
    backgroundColor:'#FDFFF0',
    marginTop:30,
    padding:4
  },
  dishes:{
    backgroundColor:'#FDFFF0',
    width:'100%',
    alignItems:'center',
    justifyContent:'center',
    flexDirection:'row',
    flexWrap:'wrap'
  },
  dish:{
    width:'30%',
    height:'45%',
    backgroundColor:'#6CE8B7',
    alignItems:'center',
    textAlign:'center',
    justifyContent:'center',
    borderRadius:20,
    margin:5
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
    height:'10%'
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  avatarsContainer: {
    flexDirection: 'row'
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 16,
    marginHorizontal: 2,
  },
  messageBubble: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 10,
    marginVertical: 5,
  },
  avatarIcon: {
    marginRight: 10,
  },
  messageTextContainer: {
    backgroundColor: '#6CE8B7',
    borderRadius: 10,
    padding: 10,
    maxWidth: '80%',
    marginTop:10
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
    height:'80',
  },
  input: {
    flex: 1,
    padding: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginHorizontal: 10,
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
    width:'100%',
    height:'15%',
    alignItems:'center',
    borderBottomWidth:1
  },
  scrollView: {
    flex: 1,
    width:'90%',
    height:'100%'
  },
  historyList: {
    marginTop: 20,
    backgroundColor:'red',
  },
  historyItem: {
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#6CE8B7',
    borderRadius: 10,
    width:'100%',
    height:'15%',
    flexDirection:'row'
  }
});