import { Component, OnInit } from '@angular/core';
import { LocalNotifications, ScheduleOptions } from '@capacitor/local-notifications';

@Component({
  selector: 'app-local-notification',
  templateUrl: './local-notification.page.html',
  styleUrls: ['./local-notification.page.scss'],
})
export class LocalNotificationPage implements OnInit {

  constructor() { }

  async ngOnInit() {
    let notiPermission = await LocalNotifications.requestPermissions();
    if(notiPermission.display != 'granted'){
      alert('Please allow notifications in your settings');
    }
  }

  async ScheduleNoti(){
    let dateString = '2024-02-18T16:33:00';
    let newDate = new Date(dateString);
    let options: ScheduleOptions = {
      notifications: [
        {
          id: 2,
          title: 'UTM 2024',
          body: 'This is scheduled notification!',
          schedule: {
            allowWhileIdle: true,
            at: newDate,
            every: 'hour'
          }
        }
      ]
    }
    return await LocalNotifications.schedule(options);
  }

  async removeAllNotifications(){
    return await LocalNotifications.removeAllDeliveredNotifications();
  }

  async ScheduleEveryMin(){
    let options: ScheduleOptions = {
      notifications: [
        {
          id: 3,
          title: 'UTM 2024',
          body: 'Testing notification every 1 minute',
          schedule: {
            allowWhileIdle: true,
            every: 'minute',
            repeats: true
          }
        }
      ]
    }
    return await LocalNotifications.schedule(options);
  }

  async SingleLineNotification(){
    let options: ScheduleOptions = {
      notifications: [
        {
          id: 1,
          title: 'Test single notification',
          body: 'Testing single notification'
        }
      ]
    }
    return await LocalNotifications.schedule(options);
  }

}
