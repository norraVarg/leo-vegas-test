import YouTubePlayer from './YoutubePlayer'
import '../styles/trailerModal.scss'

export const TrailerModal = ({ videoKey, closeModal }) => {
  window.onclick = function (event) {
    if (event.target.id === 'trailerModal') {
      closeModal()
    }
  }

  return (
    <dialog id='trailerModal' className='trailer-modal'>
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
    </dialog>
  )
}
