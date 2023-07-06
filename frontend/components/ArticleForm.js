import React, { useEffect, useState } from 'react';
import PT from 'prop-types'
import axios from 'axios'

//for localStorage and axios
const token = localStorage.getItem('token');
console.log('token:', token);

//payload for axios
const initialFormValues = { 
    title: '', 
    text: '', 
    topic: '' 
}

  // // Trim the properties of the payload -- in isDisabled below



export default function ArticleForm(props) {
  //payload for axios.post - has the form data 
  const [values, setValues] = useState(initialFormValues);
  // ✨ where are my props? Destructure them here
  const {currentArticle, setCurrentArticle} = props;
 


  // ✨ implement -- for useEffect - for edit button
  // Every time the `currentArticle` prop changes, we should check it for truthiness:
  // if it's truthy, we should set its title, text and topic into the corresponding
  // values of the form. If it's not, we should reset the form back to initial values.
  useEffect(()=>{
    if (currentArticle) {
      setValues({
        title: currentArticle.title,
        text: currentArticle.text,
        topic: currentArticle.topic
      });
    } else{
      setValues({
        title: '',
        text: '',
        topic: ''
      });
    }
  }, [currentArticle])

    // console.log(initialFormValues)

  const onChange = evt => {
    const { id, value } = evt.target
    setValues({ ...values, [id]: value })
  }


    const onSubmit = async evt => {
      evt.preventDefault()
      // ✨ implement
      // We must submit a new post or update an existing one,
      // depending on the truthyness of the `currentArticle` prop.
      const { title, text, topic } = values;
      const payload = {
        title,
        text,
        topic
      };
  
      try {
        if (currentArticle) {
          // If `currentArticle` exists, it means we're updating an existing post
  
          // Add any additional properties specific to updating an article
          payload.id = currentArticle.id; // Assuming there's an `id` property in the `currentArticle`
  
          // Make the API request to update the post
          const response = await axios
            .put(`http://localhost:9000/api/articles/{currentArticle.id}` + currentArticle.id, payload,       
            {
              headers: {
              authorization: token
            }
          })
            
          
          // Handle the success response
          console.log('Post updated successfully:', response.data);
        } else {
          // If `currentArticle` is falsy, it means we're creating a new post
  
          console.log('heretoken:', token)
          // Make the API request to create a new post
          const response = await axios.post('http://localhost:9000/api/articles', payload, {
            headers: {
            authorization: token
          }
        });

          
          // Handle the success response
          console.log('New post created successfully:', response.data);
        }
  
        // Reset the form values after successful submission or update
        setValues({
          title: '',
          text: '',
          topic: ''
        });
  
        // Perform any additional actions or state updates
      } catch (error) {
        // Handle any errors that occur during the API request
        console.error('Error submitting the post:', error);
    }

}



  const isDisabled = () => {
    console.log("isDisabled test", values)
    // ✨ implement
    // Make sure the inputs have some values
       // Trim the properties of the payload
       const trimTitle = values.title.trim();
       const trimText = values.text.trim();
   
       if (trimTitle.length >= 1 && trimText.length >= 1){
         console.log("AF: Length is valid.");
         // i feel like i need to add something here... 
         
       } else {
         console.log("AF: Length is invalid.")
       }
   
      //  console.log('INITIAL FORM VALUES', values);
  }



return (
  // ✨ fix the JSX: make the heading display either "Edit" or "Create"
  // and replace Function.prototype with the correct function
  <form id="form" onSubmit={onSubmit}>
    <h2>{currentArticle ? 'Edit' : 'Create'} Article</h2>
    <input
      maxLength={50}
      onChange={onChange}
      value={values.title}
      placeholder="Enter title"
      id="title"
    />
    <textarea
      maxLength={200}
      onChange={onChange}
      value={values.text}
      placeholder="Enter text"
      id="text"
    />
    <select 
      onChange={onChange} 
      id="topic" 
      value={values.topic}>
      <option value="">-- Select topic --</option>
        <option value="JavaScript">JavaScript</option>
        <option value="React">React</option>
        <option value="Node">Node</option>
    </select>
    <div className="button-group">
      
      <button disabled={isDisabled(values)} id="submitArticle">Submit</button> 
      <button onClick={()=>{setCurrentArticle(null)}}>Cancel edit</button>

    </div>
  </form>
)
}












// 🔥 No touchy: LoginForm expects the following props exactly:
ArticleForm.propTypes = {
  postArticle: PT.func.isRequired,
  updateArticle: PT.func.isRequired,
  setCurrentArticle: PT.func.isRequired,
  currentArticle: PT.shape({ // can be null or undefined, meaning "create" mode (as opposed to "update")
    article_id: PT.number.isRequired,
    title: PT.string.isRequired,
    text: PT.string.isRequired,
    topic: PT.string.isRequired,
  })
}
