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
      {videoKey ? (
        <div className='trailer-modal-content'>
          <YouTubePlayer
            videoKey={videoKey}
          />
        </div>
      ) : (
        <div className='no-trailer'>
          <div className='no-trailer-message'>No trailer available. Try another movie</div>
        </div>
      )}
    </div>
  )
}

export default TrailerModal