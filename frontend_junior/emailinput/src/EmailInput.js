import React, { useState } from 'react';

const EmailInput = () => {
  const [email, setEmail] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [focused, setFocused] = useState(false);

  // List of email providers sorted by popularity
  const providers = [
    "orange.fr",
    "outlook.fr",
    "gmail.com",
    "hotmail.fr",
    "outlook.com",
    "hotmail.com",
    "wanadoo.fr",
    "yahoo.fr",
    "laposte.net",
    "yahoo.com",
    "sfr.fr",
    "msn.com",
    "live.fr",
    "free.fr",
    "numericable.fr",
    "bbox.fr",
    "neuf.fr"
  ]
  

  // Function to handle changes in the input field
  const handleInputChange = (event) => {
    const value = event.target.value;
    setEmail(value);
    setFocused(false);
    // If the input does not contain "@", display the thress most popular providers 
    if(!value.includes('@') ) {
     setSuggestions(providers.slice(0, 3));
    }
    // If the input contains "@", display a match provider starts with the same letter as the domain name
    if (value.includes('@') ) {
      const domain = value.split('@')[1];
      console.log(value.split('@'),domain);
      const filteredSuggestions = providers.filter((provider) => provider.startsWith(domain));
      filteredSuggestions.length > 0 ?  setSuggestions(filteredSuggestions.slice(0, 3)) : setSuggestions(providers.slice(0, 3));
    } 
  };

  // Function to handle suggestion selection
  const handleSuggestionClick = (suggestion) => {
    setEmail(email.split('@')[0] + '@' + suggestion);
    setFocused(true);
  };

  return (
    <div className="email">
      <input
        className="email-input"
        type="email"
        value={email}
        onChange={handleInputChange}
      />
      {suggestions.length > 0  && !focused && (
        <div>
          {suggestions.map((provider) => (
            <a className="suggestion" key={provider} onClick={() => handleSuggestionClick(provider)}>
             {`@${provider}`} 
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default EmailInput;
