import React from "react";
import "./SearchInput.css";

const SearchInput = () => {
  return (
    <div className="search-widget">
      <input
        type="text"
        className="search-widget__input"
        placeholder="Search keywords..."
        aria-label="Search"
      />
      <button type="button" className="search-widget__button">
        Search
      </button>
    </div>
  );
};

export default SearchInput;

/*
We want to build a custom search widget for our website.

On the left side there should be the input field where the user will type their search keywords, and on the right side, the Search button.

The final product should have the following:
- The input field should have a larger height than the default height of the input.
- The input field should have at least two times larger width than the Search button.
- The Search button's height should match the input's height.
- The input field should have rounded corners only for the top left and bottom left corners.
- The Search button should have rounded corners only for the top right and bottom right corners.
- The input and the Search button should be next to each other, and there shouldn't be any space between them. However, their borders may overlap. The interior corners should not be rounded.
- The Search button's text should be centered within the button.
- The input field should have a placeholder text, and it should have paddings.
- The Search button should have a different color. It may be any color.
*/