package com.raffaelli.bank.market_data_service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import java.util.Random;

//Rest Decorator
@RestController
public class MarketDataController {
    private final Random random = new Random(); // Constructor

    // Map Decorator
    @GetMapping("/api/ticks")
        public List<Tick> getTicks() {
            return List.of(
            new Tick("TEST_EQUITY", 100 + random.nextGaussian()),
            new Tick("TEST_FX", 1.10 + 0.001 * random.nextGaussian()));
    }
}

