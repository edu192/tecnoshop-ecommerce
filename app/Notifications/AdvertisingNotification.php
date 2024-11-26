<?php

namespace App\Notifications;

use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class AdvertisingNotification extends Notification
{
    public function __construct( protected string $subject, protected string $message, protected string $url)
    {
    }

    public function via($notifiable)
    : array
    {
        return ['mail'];
    }

    public function toMail($notifiable)
    : MailMessage
    {
        return (new MailMessage)
            ->subject($this->subject)
            ->greeting('Hola, tenemos una nueva publicidad para ti!')
            ->line($this->message)
            ->action('Ver producto', url($this->url))
            ->line('Gracias por elegirnos!');
    }

    public function toArray($notifiable)
    : array
    {
        return [];
    }
}
