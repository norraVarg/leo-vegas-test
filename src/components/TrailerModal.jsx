import YouTubePlayer from './YoutubePlayer'
import '../styles/trailerModal.scss'

const TrailerModal = ({ videoKey, closeModal }) => {

  window.onclick = function (event) {
    if (event.target.id === 'trailerModal') {
      closeModal()
    }
  }

  return (
    <div id='trailerModal' className='trailer-modal'>
      <div className='trailer-modal-content'>
        {videoKey ? (
          <YouTubePlayer
            videoKey={videoKey}
          />
        ) : (
          <div className='no-trailer'>
            <span className='no-trailer-message'>No trailer available. Try another movie</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default TrailerModal