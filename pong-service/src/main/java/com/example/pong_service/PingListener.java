package com.example.pong_service;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;
import com.example.pong_service.Config.RabbitMQConfig;

import java.util.Map;

@Component
public class PingListener {

    @RabbitListener(queues = RabbitMQConfig.PING_QUEUE)
    public Map<String, String> handlePing(Map<String, Object> message) {
        System.out.println("PongService: Получен ping запрос");
        System.out.println("Сообщение: " + message);

        // Просто возвращаем ответ - RabbitMQ автоматически отправит его обратно в reply-to очередь
        return Map.of(
                "response", "Pong",
                "timestamp", java.time.Instant.now().toString(),
                "from", "pong-service"
        );
    }
}