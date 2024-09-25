"use client";
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function SonnerDemo() {
  function notify_default(){ toast('This is a Sonner toast!');}
  function notify_descriptive(){ toast.message('Event has been created', {
    description: 'Monday, January 3rd at 6:00pm',});}
  function notify_success(){ toast.success('Event has been created');}
  function notify_info(){ toast.info('Be at the area 10 minutes before the event time')}
  function notify_warning(){ toast.warning('Event start time cannot be earlier than 8am')}
  function notify_error(){ toast.error('Event has not been created')}
  function notify_action(){toast('Event has been created', {
    action: {
      label: 'Undo',
      onClick: () => console.log('Undo')
    },
  })}
//   function notify_promise(){const promise = () => new Promise((resolve) => setTimeout(() => resolve({ name: 'Sonner' }), 2000));

//   toast.promise(promise, {
//     loading: 'Loading...',
//     success: (data) => {
//       return `${data.name} toast has been added`;
//     },
//     error: 'Error',
//   });}
  function notify_custom(){toast(<div>A custom toast with default styling</div>)}

  return (
    <div>
      <Button onClick={notify_default} className='mr-4 mb-4'>Show Normal Toast</Button>
      <Button onClick={notify_descriptive} className='mr-4'>Show Descriptive Toast</Button>
      <Button onClick={notify_success} className='mr-4'>Show Success Toast</Button>
      <Button onClick={notify_info} className='mr-4'>Show Info Toast</Button>
      <Button onClick={notify_warning} className='mr-4'>Show Warning Toast</Button>
      <Button onClick={notify_error} className='mr-4'>Show Error Toast</Button>
      <Button onClick={notify_action} className='mr-4'>Show Action Toast</Button>
      {/* <Button onClick={notify_promise}>Show Promise Toast</Button> */}
      <Button onClick={notify_custom} className='mr-4'>Show Custom Toast</Button>
    </div>
  );
}