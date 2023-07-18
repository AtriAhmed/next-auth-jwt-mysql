'use client'
export default function TimerItem({number,word}){
    return <div className='flex flex-col items-center'><div className='bg-orange-500 text-white rounded-lg p-2 min-w-28 text-center'>{number > 9 ? number : '0' + number}</div><div className="text-xl">{number == 1 ? word : word + 's'}</div></div>
}