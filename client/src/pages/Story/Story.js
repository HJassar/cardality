import React, { useEffect, useState } from "react";

// import { Link } from 'react-router-dom'

// import { connect } from "react-redux";
// import {
//   addCards,
//   changePage,
//   setMaxCards,
// } from "../../redux/story/story.actions";

import querystring from 'query-string'
import axios from "axios";

// import Loader from "react-loader-spinner";

import "./Story.scss";

const Story = ({ match,
  location
  // ,
  // nextStoryPage,
  // currentStoryName,
  // currentStoryCards,
  // addCards,
  // changePage,
  // setMaxCards,
  // maxCards,
}) => {

  // Parsing the page from the router's link
  // let parsed = ;
  const [currentPage, setCurrentPage] = useState(querystring.parse(location.search).page || 1);
  // Story Id
  const storyId = match.params.id;

  const [cardsData, setCardsData] = useState(undefined);
  const [storyName, setStoryName] = useState(undefined);
  const [pageCount, setPageCount] = useState(undefined);

  const [pageNav, setPageNav] = useState(undefined)
  const navLinks = [];

  useEffect(() => {
    setCardsData(undefined);
    axios
      .get(`/cards/fromstory/${storyId}?page=${currentPage}`)
      .then(res => {
        setCardsData(res.data)
      })
    return () => {
      // cleanup
    }
  }, [currentPage])

  useEffect(() => {
    axios
      .get(`/stories/${storyId}`)
      .then(res => {
        setStoryName(res.data.name)
        setPageCount(res.data.pageCount)
      })
    return () => {
      // cleanup
    }
  }, [])


  useEffect(() => {
    if (pageCount) {
      for (let page = 1; page <= pageCount; page++) {
        navLinks.push(
          <button
            onClick={
              () => {
                window.history.pushState(null, null, `?page=${page}`);
                setCurrentPage(page)
              }
            }
          >{page}</button>
        )
      }
      setPageNav(navLinks)
    }

    return () => {
      // cleanup
    }
  }, [pageCount])



  return (
    <>
      <h2>
        {storyName ?
          storyName :
          'loading Story Name'
        }
      </h2>
      {
        cardsData ?
          cardsData.map(card => {
            return <li>{card.text}</li>
          })

          :
          'Loading cards'
      }
      < hr />
      {pageCount ?
        pageNav :
        'loading page nav'
      }
    </>
  )
}


//   const pullCards = () => {
//     setCardsLoading(true);
//     //refactor card pulling once able to access currentStoryId from state
//     axios
//       .get(`/stories/${storyId}?page=${nextStoryPage}`)
//       .then((res) => {
//         //Refactor later into a batch of cards instead of individual. Had a bug where it was putting all the text in a single <li></li>.
//         addCards(res.data.requestedCards);
//         //Increase the page by 1
//         changePage(1);
//         setMaxCards(res.data.numberOfCards);
//         setCardsLoading(false);
//       })
//       .catch((err) => console.log(err.message));
//   };
//   useEffect(() => {
//     //Once page loads, initial pull of cards
//     if (nextStoryPage === 1) {
//       pullCards();
//     }
//   }, []);

//   //LOAD 10 cards at a time
//   const handleClick = () => {
//     //Logic for handling loading more feature
//     pullCards();
//   };
//   return (
//     <>
//       <h1 className="Story__name">{currentStoryName}</h1>
//       <div>
//         <ul>
//           {currentStoryCards
//             ? currentStoryCards.map((cardText, index) => {
//               return (
//                 // Let's make a component for Card
//                 <div className='Card block' key={index}>
//                   {cardText}
//                 </div>
//               );
//             })
//             : (
//               <div>
//                 <Loader
//                   className="Story__loader"
//                   type="ThreeDots"
//                   timeout={3000} //3 secs
//                 />
//               </div>
//             )}
//         </ul>
//         {currentStoryCards.length !== maxCards ? (
//           !cardsLoading ? (
//             <div>
//               <button className="Story__load-more" onClick={handleClick}>
//                 LOAD MORE
//               </button>
//             </div>
//           ) : (
//               <div>
//                 <Loader
//                   className="Story__loader"
//                   type="ThreeDots"
//                   timeout={3000} //3 secs
//                 />
//               </div>
//             )
//         ) : (
//             <div>END OF STORY</div>
//           )}
//       </div>
//     </>
//   );
// };

// const mapStateToProps = (state) => ({
//   currentStoryId: state.story.currentStoryId,
//   nextStoryPage: state.story.nextStoryPage,
//   currentStoryName: state.story.currentStoryName,
//   currentStoryCards: state.story.currentStoryCards,
//   maxCards: state.story.maxCards,
// });

// const mapDispatchToProps = (dispatch) => ({
//   addCards: (cards) => dispatch(addCards(cards)),
//   changePage: (value) => dispatch(changePage(value)),
//   setMaxCards: (value) => dispatch(setMaxCards(value)),
// });

// export default connect(mapStateToProps, mapDispatchToProps)(Story);

export default (Story);
