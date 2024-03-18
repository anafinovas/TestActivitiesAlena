package org.example.senders;

public class MainSender {
    public static void main(String[] args) {
        EmailSender emailSender = new EmailSender();
        emailSender.run();

        TelegramSender telegramSender = new TelegramSender();
        telegramSender.run();
        //System.exit(0);
    }
}
//This is a comment in order to trigger build in Jenkins
