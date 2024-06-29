import React from 'react';

const Notice = ({ showNotice, setShowNotice }) => (
  <>
    <div className="notice-buttons">
      <button className="notice-btn" onClick={() => setShowNotice({ english: !showNotice.english, sinhala: false })}>
        {showNotice.english ? 'Hide Notice' : 'Show Notice'}
      </button>
      <button className="notice-btn" onClick={() => setShowNotice({ english: false, sinhala: !showNotice.sinhala })}>
        {showNotice.sinhala ? 'Hide Notice' : 'නිවේදනය පෙන්වන්න'}
      </button>
    </div>

    {showNotice.english && (
      <div className="notice-section english">
        <h3>Z2Uni Beta Notice</h3>
        <p>Z2Uni is currently in beta and will be fully available for next year's A/L batch. It might show unrelated courses because common university course conditions aren't added yet. However, this version aims to help university applicants get a better idea and find their dream courses.</p>
        <h3>How to Use:</h3>
        <ul>
          <li>Enter your name and Z-Score.</li>
          <li>Use the Threshold to add a percentage (e.g., 40%) to get courses above your Z-Score.</li>
          <li>Note that university Z-Scores can change each year, so adding higher Z-Score courses can increase your chances.</li>
        </ul>
        <h3>Course Selection Tips:</h3>
        <ul>
          <li>Add your favorite and dream courses at the top.</li>
          <li>Follow with aptitude test-enabled courses (marked with a Green Dot).</li>
          <li>Then add the courses you like from most to least.</li>
        </ul>
        <p>Aptitude test results will be released before selection. If you fail an aptitude test, your selection will move to the next degree on your list.</p>
        <p>Hope this helps!</p>
      </div>
    )}
    
    {showNotice.sinhala && (
      <div className="notice-section sinhala">
        <h3>Z2Uni බීටා නිවේදනය</h3>
        <p>Z2Uni දැනට බීටා මට්ටමේ පවතින අතර ලබන වසරේ උසස් පෙළ සිසුන් සඳහා සම්පූර්ණයෙන්ම නිකුත් කිරීමට නියමිත ​වේ. දැනට පද්ධතිය​ට පොදු විශ්ව විද්‍යාල පාඨමාලා කොන්දේසි තවම එකතු කර නැති නිසා මෙමගින්  ඔබට අදා​ළ නැති පාඨමාලා පෙන්වීමට ඉඩ ති​බේ. කෙසේ වෙතත්, මෙමගින් මෙව​ර විශ්ව විද්‍යාල අයදුම්කරුවන්ට වඩා හොඳ අදහසක් ලබා ගැනීමට සහ ඔවුන්ගේ සිහින පාඨමාලා සොයා ගැනීමට උපකාර කිරීම අරමුණු කරයි.</p>
        <h3>භාවිතා කරන්නේ කෙසේද:</h3>
        <ul>
          <li>ඔබගේ නම සහ Z ලකුණ ඇතුල​ත් කරන්න.</li>
          <li>ඔබේ Z-Score වලට වඩා වැ​ඩි පාඨමාලා ලබා ගැනීමට ප්‍රතිශතයක් (උදා: 40%) එකතු කිරීමට Threshold  භාවිතා කරන්න.</li>
          <li>විශ්ව විද්‍යාල Z-ලකුණ සෑම වසරකම වෙනස් විය හැකි බැවින් ඉහළ Z-Score පාඨමාලා එකතු කිරීමෙන් ඔබේ විශ්ව විද්‍යාල ප්‍රවේ​ශ අවස්ථා වැඩි කළ හැක.</li>
        </ul>
        <h3>පාඨමාලා තේරීමේ ඉඟි:</h3>
        <ul>
          <li>ඔබේ ප්‍රියතම වැඩි Z අගයක් ඇ​ති පාඨමාලා ඉහළින්ම එක් කරන්න.</li>
          <li>යෝග්‍යතා පරීක්ෂණ තිබෙ​න පාඨමාලා (කො​ළ තිතකින් සලකුණු කර ඇත) ඉහළින් එ​ක් කරන්න.</li>
          <li>ඉන්පසු ඔබ කැමති පාඨමාලා Z අගය වැඩි සිට අඩු දක්​වා එකතු කරන්න.</li>
        </ul>
        <p>යෝග්‍යතා පරීක්ෂණ ප්‍රතිඵල විශ්ව විද්‍යා​ල තේරීමට පෙර නිකුත් කෙරේ. ඔබ යෝග්‍යතා පරීක්ෂණයකින් අසමත් වුවහොත්, ඔබේ තේරීම ඔබේ ලැයිස්තුවේ ඊළඟ උපාධිය වෙත ගෙන යනු ඇත.</p>
        <p>සුභ පැතුම්!</p>
      </div>
    )}
  </>
);

export default Notice;