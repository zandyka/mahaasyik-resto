<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ReservationTicketMail extends Mailable
{
    use Queueable, SerializesModels;

    public $reservation;
    public $pdfPath;

    public function __construct($reservation, $pdfPath)
    {
        $this->reservation = $reservation;
        $this->pdfPath = $pdfPath;
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Tiket Reservasi Mahaasyik - ' . $this->reservation->reservation_code,
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.reservation_ticket',
        );
    }

    public function attachments(): array
    {
        return [
            Attachment::fromPath($this->pdfPath)
                ->as('Tiket_Reservasi_' . $this->reservation->reservation_code . '.pdf')
                ->withMime('application/pdf'),
        ];
    }
}
