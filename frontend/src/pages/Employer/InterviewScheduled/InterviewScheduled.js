import React from 'react'

export default function InterviewScheduled() {
  return (
    <div>
      
      <div className='ch3-cntnr'>
        <div className='int-preassinterviews'>
          <button className='int-dashpreass'>Pre-Assessment</button>
          <button className='int-dashinterview'>Interviews</button>
        </div>
        <div className='codinground'>Coding Round</div>
        <div className='codingquestion'>
          <div>Question no. 1</div>
          <div>Write the coding question</div>
        </div>
        <div className='addcodingquestion'>
          <button className='addcodingquestionbutton'>Add+</button>
        </div>

        <div>Aptitude Round</div>
        <div className='intaptituderound'>
          <div >
            <div>Question</div>
            <div className='int-section1'>
              <div>Question no 1</div>
              <div>Aptitude Question </div>
            </div>
          </div>
          <div>
            <div>Option</div>
            <div className='int-section2'>
              <div>A <span>Option 1</span></div>
              <div>B <span>Option 2</span></div>
              <div>C <span>Option 3</span></div>
              <div>D <span>Option 4</span></div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
